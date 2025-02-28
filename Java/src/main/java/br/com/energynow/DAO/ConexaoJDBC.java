package br.com.energynow.DAO;

import java.sql.*;

class ConexaoJDBC {
    // Configuração dos parâmetros de autenticação
    String driverJDBC = "oracle.jdbc.driver.OracleDriver";//Nome do driver Oracle
    String server = "oracle.fiap.com.br";//Endereço do Banco de dados (server)
    String port = "1521";// Porta TCP padrão do Oracle
    String user = "RM555152";//usuario
    String passwd = "030205";//senha
    String sid = "ORCL";//SID do banco
    String url = "jdbc:oracle:thin:@" + server + ":" + port + ":" + sid;//Criação da url para a conexão
    Connection conexao =null;

    public Connection getConexao() {
        return conexao;
    }

    public void conectar(){
        try {
            Class.forName (driverJDBC);//carregando Driver
            //Realizando conexão
            conexao = DriverManager.getConnection (url , user , passwd);
        } catch (Exception e) {
            System.out.println ("Erro");
            e.printStackTrace ();

        }
    }



}