package br.com.energynow.DAO;

import br.com.energynow.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao implements IDao<User, String> {
    ConexaoJDBC conexaoJDBC = new ConexaoJDBC();


    @Override
    public void create(User user) throws SQLException{
        String sql = "INSERT INTO t_user (nome, senha, cpf, email, cep) VALUES (?, ?, ?, ?, ?) ";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString(1, user.getNome());
        statement.setString(2, user.getSenha());
        statement.setString(3, user.getCpf());
        statement.setString(4, user.getEmail());
        statement.setString(5, user.getCep());
        statement.execute();

        statement.close();
        conexao.close();
    }

    @Override
    public User read(User user) throws SQLException{
        String sql = "SELECT nome, senha, cpf, email, cep FROM t_user WHERE email = ? AND senha = ?";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString(1, user.getEmail());
        statement.setString(2, user.getSenha());

        ResultSet result = statement.executeQuery();
        if (result.next()) {
            user.setNome(result.getString(1));
            user.setSenha(result.getString(2));
            user.setCpf(result.getString(3));
            user.setEmail(result.getString(4));
            user.setCep(result.getString(5));
        } else {
            throw new SQLException();
        }

        result.close();
        statement.close();
        conexao.close();
        return user;
    }

    public String readCep(String email) throws SQLException{
        String cep;

        String sql = "SELECT cep FROM t_user WHERE email = ? ";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString(1, email);
        ResultSet result = statement.executeQuery();
        if (result.next()) {
            cep = result.getString(1);

        } else {
            throw new SQLException();
        }

        result.close();
        statement.close();
        conexao.close();

        return cep;
    }

    @Override
    public void update(User user) throws SQLException{
        String sql = "UPDATE t_user SET nome = ?, senha  = ?, cpf  = ?, cep = ? WHERE email = ?";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString(1, user.getNome());
        statement.setString(2, user.getSenha());
        statement.setString(3, user.getCpf());
        statement.setString(4, user.getCep());
        statement.setString(5, user.getEmail ());

        statement.executeUpdate();

        statement.close();
        conexao.close();

    }

    @Override
    public void delete(String email) throws SQLException{
        String sql = "DELETE FROM t_user WHERE email = ?";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString (1, email);
        statement.execute();

        statement.close();
        conexao.close();
    }
}

