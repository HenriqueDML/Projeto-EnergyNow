package br.com.energynow.Service;

import br.com.energynow.DAO.GerenciamentoDao;
import br.com.energynow.DAO.UserDao;
import br.com.energynow.Exceptions.CEPInvalidoException;
import br.com.energynow.model.User;

import java.sql.SQLException;

public class UserService {
    UserDao d = new UserDao();

    public User cadastro (User user) throws SQLException, CEPInvalidoException {
        user.setCep (validarCep (user.getCep ()));
        d.create(user);
        d.read(user);
        return user;
    }

    public User login (User user) throws SQLException{
       d.read(user);
       return user;
    }

    public void update (User user) throws SQLException{
        d.update(user);
    }

    public void delete (String email) throws SQLException{
        GerenciamentoDao dGeren = new GerenciamentoDao ();

        dGeren.deleteTudo (email);
        d.delete(email);
    }

    private static String validarCep(String cep) throws CEPInvalidoException {
        cep = cep.replaceAll ("[^0-9]", "");

        if (cep.length () != 8) {
            throw new CEPInvalidoException ();
        } else {
            return cep.substring (0 , 5) + "-" + cep.substring (5);
        }
    }
}

