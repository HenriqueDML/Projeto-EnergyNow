package br.com.energynow.DAO;

import java.sql.SQLException;

public interface IDao<T, S> {
    void create (T t) throws SQLException;
    T read (T t) throws SQLException;
    void update (T t) throws SQLException;
    void delete (S s) throws SQLException;

}
