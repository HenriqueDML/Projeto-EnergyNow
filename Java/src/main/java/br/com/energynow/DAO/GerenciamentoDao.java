package br.com.energynow.DAO;

import br.com.energynow.model.Gerenciamento;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class GerenciamentoDao implements IDao<Gerenciamento, Integer> {
    ConexaoJDBC conexaoJDBC = new ConexaoJDBC();

    @Override
    public void create(Gerenciamento geren) throws SQLException {

        String sql = "INSERT INTO t_gerenciamento (data, kwh, email, UF) VALUES (TO_DATE(?, 'MM-YYYY'), ?, ?, ?) ";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString (1, geren.getData ());
        statement.setInt (2, geren.getkWh ());
        statement.setString (3, geren.getEmail ());
        statement.setString (4, geren.getUf ());
        statement.executeUpdate();

        statement.close();
        conexao.close();

    }

    @Override
    public Gerenciamento read(Gerenciamento geren) throws SQLException {
        String sql = "SELECT  id, data, kwh, email, UF FROM t_gerenciamento WHERE email = " + geren.getEmail ();
        conexaoJDBC.conectar ();
        Connection conexao = conexaoJDBC.getConexao ();

        Statement statement = conexao.createStatement();
        ResultSet result = statement.executeQuery(sql);

        Gerenciamento gerenciamento = new Gerenciamento ();
        gerenciamento.setId (result.getInt (1));
        gerenciamento.setData (String.valueOf (result.getDate (2)));
        gerenciamento.setkWh (result.getInt (3));
        gerenciamento.setEmail (result.getString (4));
        gerenciamento.setUf (result.getString (5));

        return gerenciamento;
    }

    public List<Gerenciamento> readList(String email) throws SQLException{
        List<Gerenciamento> v = new ArrayList<> ();

        String sql = "SELECT  id, data, kwh, email, UF FROM t_gerenciamento WHERE email = ?";
        conexaoJDBC.conectar ();
        Connection conexao = conexaoJDBC.getConexao ();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString(1, email);

        ResultSet result = statement.executeQuery();

        while (result.next()) {
            Gerenciamento gerenciamento = new Gerenciamento ();
            gerenciamento.setId (result.getInt (1));
            gerenciamento.setData (String.valueOf (result.getDate (2)));
            gerenciamento.setkWh (result.getInt (3));
            gerenciamento.setEmail (result.getString (4));
            gerenciamento.setUf (result.getString (5));

            v.add(gerenciamento);
        }
        return v;
    }

    @Override
    public void update(Gerenciamento geren) throws SQLException {
        String sql = "UPDATE t_gerenciamento SET data = TO_DATE(?, 'MM-YYYY'), kwh= ?, UF= ? WHERE id = ?";
        conexaoJDBC.conectar ();
        Connection conexao = conexaoJDBC.getConexao ();

        PreparedStatement statement = conexao.prepareStatement (sql);
        statement.setString (1, geren.getData ());
        statement.setInt (2, geren.getkWh ());
        statement.setString (3, geren.getUf ());
        statement.setInt (4, geren.getId ());

        statement.executeUpdate();

        statement.close ();
        conexao.close ();
    }

    @Override
    public void delete(Integer id) throws SQLException {
        String sql = "DELETE FROM t_gerenciamento WHERE id = ?";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setInt (1, id);
        statement.execute();

        statement.close();
        conexao.close();
    }

    public void deleteTudo(String email) throws SQLException {
        String sql = "DELETE FROM t_gerenciamento WHERE email = ?";
        conexaoJDBC.conectar();
        Connection conexao = conexaoJDBC.getConexao();

        PreparedStatement statement = conexao.prepareStatement(sql);
        statement.setString (1, email);
        statement.execute();

        statement.close();
        conexao.close();
    }

}
