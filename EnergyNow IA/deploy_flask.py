from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib

app = Flask(__name__)

# Carregar os modelos e escaladores
modelo_regressao = joblib.load('modelo_regressao.pkl')
modelo_classificacao = joblib.load('modelo_classificacao.pkl')
scaler_class = joblib.load('scaler_class.pkl')
scaler_reg = joblib.load('scaler_reg.pkl')


@app.route('/')
def home():
    return render_template('index.html')


# Endpoint para prever a redução de CO2 (Regressão)
@app.route('/prever_co2', methods=['POST'])
def prever_co2():
    dados = request.get_json()

    # Converter os dados recebidos em DataFrame
    entrada_df = pd.DataFrame([dados])

    # Preparar os dados para regressão (codificar dummies e normalizar)
    entrada_df = pd.get_dummies(entrada_df, columns=['Qual a região de implementação do projeto de energia?'], dtype=int)

    # Garantir alinhamento com o treinamento
    faltando = set(scaler_reg.feature_names_in_) - set(entrada_df.columns)
    for col in faltando:
        entrada_df[col] = 0
    entrada_df = entrada_df[scaler_reg.feature_names_in_]

    # Normalizar os dados
    entrada_padronizada = scaler_reg.transform(entrada_df)

    # Fazer a previsão de redução de CO2
    predicao = modelo_regressao.predict(entrada_padronizada)

    return jsonify({'reducao_co2_estimada': predicao[0]})


# Endpoint para classificar o tipo de energia (Classificação)
@app.route('/classificar_tipo', methods=['POST'])
def classificar_tipo():
    dados = request.get_json()

    # Converter os dados recebidos em DataFrame
    entrada_df = pd.DataFrame([dados])

    # Preparar os dados para classificação (codificar dummies e normalizar)
    entrada_df = pd.get_dummies(entrada_df, columns=['Qual a região de implementação do projeto de energia?'], dtype=int)

    # Garantir alinhamento com o treinamento
    faltando = set(scaler_class.feature_names_in_) - set(entrada_df.columns)
    for col in faltando:
        entrada_df[col] = 0
    entrada_df = entrada_df[scaler_class.feature_names_in_]

    # Normalizar os dados
    entrada_padronizada = scaler_class.transform(entrada_df)

    # Fazer a previsão de tipo de energia
    predicao = modelo_classificacao.predict(entrada_padronizada)

    return jsonify({'tipo_energia': predicao[0]})


if __name__ == '__main__':
    app.run(debug=True)

