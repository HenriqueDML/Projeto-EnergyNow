import oracledb
import datetime
import re
import os
import time
import requests

# Configuração da conexão com o banco de dados Oracle
dsn_tns = oracledb.makedsn('oracle.fiap.com.br', '1521', service_name='ORCL')
conn = oracledb.connect(user="rm555152", password="030205", dsn=dsn_tns)

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def validar_email(email):
    padrao = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(padrao, email) is not None

def validar_cep(cep):
    return len(cep) == 8 and cep.isdigit()

def validar_cpf(cpf):
    cpf = ''.join(filter(str.isdigit, cpf))
    if len(cpf) != 11:
        return False
    if cpf == cpf[0] * 11:
        return False
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito = (soma * 10 % 11) % 10
    if int(cpf[9]) != digito:
        return False
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito = (soma * 10 % 11) % 10
    return int(cpf[10]) == digito

def registrar_usuario():
    clear_screen()
    print("--- Registro de Usuário ---")
    nome = input("Nome: ")
    cep = input("CEP (somente números): ")
    cpf = input("CPF (somente números): ")
    email = input("Email: ")
    senha = input("Senha: ")

    if not validar_email(email):
        print("Email inválido.")
        return
    if not validar_cep(cep):
        print("CEP inválido.")
        return
    if not validar_cpf(cpf):
        print("CPF inválido.")
        return

    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO T_USER (nome, cep, cpf, email, senha) VALUES (:1, :2, :3, :4, :5)",
                       (nome, cep, cpf, email, senha))
        conn.commit()
        print("Usuário registrado com sucesso!")
    except oracledb.IntegrityError:
        print("Email já cadastrado.")
    finally:
        cursor.close()

def obter_endereco(cep):
    url = f'https://viacep.com.br/ws/{cep}/json/'
    response = requests.get(url)

    if response.status_code == 200:
        endereco = response.json()
        if 'erro' not in endereco:
            return endereco.get('uf')
        else:
            print("CEP não encontrado.")
            return None
    else:
        print("Erro ao acessar a API.")
        return None

def login():
    clear_screen()
    print("--- Login ---")
    email = input("Email: ")
    senha = input("Senha: ")

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM T_USER WHERE email = :1 AND senha = :2", (email, senha))
    usuario = cursor.fetchone()
    cursor.close()

    if usuario:
        print(f"Bem-vindo, {usuario[0]}!")
        return email
    else:
        print("Email ou senha incorretos.")
        return None

def calcular_watts(email):
    clear_screen()
    print("--- Calculadora de Watts ---")
    meses = []
    for i in range(3):
        mes = float(input(f"Consumo do mês {i+1} (em kWh): "))
        meses.append(mes)
   
    media = sum(meses) / 3
    print(f"Média de consumo: {media:.2f} kWh")

    if email:
        cursor = conn.cursor()
        data_atual = datetime.datetime.now()
        
        # Formatar a data no formato MM-YYYY
        data_formatada = data_atual.strftime('%m-%Y')
        
        cursor.execute("SELECT cep FROM T_USER WHERE email = :1", (email,))
        cep = cursor.fetchone()[0]
        uf = obter_endereco(cep)
        
        cursor.execute("""
            INSERT INTO T_GERENCIAMENTO (data, kwh, email, uf) 
            VALUES (TO_DATE(:1, 'MM-YYYY'), :2, :3, :4)
        """, (data_formatada, media, email, uf))
        conn.commit()
        cursor.close()
        
        print("Dados salvos no banco de dados.")


def simulador():
    clear_screen()
    print("--- Simulador de Consumo ---")
    eletrodomesticos = []
    while True:
        nome = input("Nome do eletrodoméstico (ou 'fim' para terminar): ")
        if nome.lower() == 'fim':
            break
        watts = float(input("Potência em Watts: "))
        horas = float(input("Horas de uso por dia: "))
        eletrodomesticos.append((nome, watts, horas))

    while True:
        clear_screen()
        print("--- Lista de Eletrodomésticos ---")
        for i, (nome, watts, horas) in enumerate(eletrodomesticos):
            print(f"{i+1}. {nome}: {watts}W, {horas}h/dia")
       
        escolha = input("\nDigite o número do eletrodoméstico para remover ou 'c' para calcular: ")
        if escolha.lower() == 'c':
            break
        try:
            indice = int(escolha) - 1
            del eletrodomesticos[indice]
        except:
            print("Escolha inválida.")
        time.sleep(1)

    total_kwh = sum(watts * horas / 1000 for _, watts, horas in eletrodomesticos)
    print(f"\nConsumo total estimado: {total_kwh * 30} kWh por mês")

def gerenciamento(email):
    clear_screen()
    print("--- Gerenciamento de Consumo ---")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT kwh, preco_kwh
        FROM T_GERENCIAMENTO g
        JOIN T_PRECO_KWH p ON g.uf = p.uf
        WHERE g.email = :1
        ORDER BY data
    """, (email,))
    dados = cursor.fetchall()
    cursor.close()
    if not dados:
        print("Não há dados suficientes para gerar a tabela.")
        return

    # Exibir dados em formato de tabela no terminal
    print(f"{'Valor kWh':<15} {'kWh usado':<15} {'Preço Mês':<15} {'Mudança de Hábito':<20} {'Energia Limpa':<15}")
    print("-" * 90)
    
    for kwh, preco_kwh in dados:
        custo_total = kwh * preco_kwh
        mudanca_habito = custo_total * 0.80  # Supondo 20% de economia com mudança de hábitos
        energia_limpa = custo_total * 0.65  # Ajuste para evitar valores negativos de energia limpa

        # Limitar as casas decimais e ajustar os alinhamentos
        print(f"{preco_kwh:<15.2f} {kwh:<15.2f} {custo_total:<15.2f} {mudanca_habito:<20.2f} {energia_limpa:<15.2f}")

    input("\nPressione Enter para voltar ao menu...")

def pagina_educacional():
    clear_screen()
    print("""
    --- Energia Solar e Eólica - Informações Educacionais ---

    Energia Solar:
    - Utiliza painéis fotovoltaicos para converter luz solar em eletricidade
    - Vantagens: energia limpa, renovável e de baixa manutenção
    - Desafios: depende das condições climáticas e tem custo inicial elevado

    Energia Eólica:
    - Utiliza turbinas para converter a energia do vento em eletricidade
    - Vantagens: energia limpa, renovável e eficiente em áreas ventosas
    - Desafios: impacto visual e sonoro, dependência de condições de vento adequadas

    Ambas as fontes são cruciais para um futuro energético sustentável e para a redução das emissões de gases de efeito estufa.
    """)

def menu_principal():
    email_logado = None
    while True:
        clear_screen()
        print("\n--- Menu Principal ---")
        print("1. Registrar")
        print("2. Login")
        print("3. Calcular Consumo de Watts")
        print("4. Simulador")
        print("5. Gerenciamento de Consumo")
        print("6. Página Educacional")
        print("7. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            registrar_usuario()
        elif opcao == '2':
            email_logado = login()
        elif opcao == '3':
            calcular_watts(email_logado)
        elif opcao == '4':
            if email_logado:
                simulador()
            else:
                print("Você precisa estar logado para calcular o consumo.")
        elif opcao == '5':
            if email_logado:
                gerenciamento(email_logado)
            else:
                print("Você precisa estar logado para acessar o gerenciamento.")
        elif opcao == '6':
            pagina_educacional()
        elif opcao == '7':
            print("Saindo...")
            break
        else:
            print("Opção inválida.")
        time.sleep(2)

menu_principal()