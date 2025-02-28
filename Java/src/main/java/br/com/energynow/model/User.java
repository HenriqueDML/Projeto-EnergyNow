package br.com.energynow.model;

public class User {
    protected String nome;
    protected String senha;
    private String email;
    private String cep;
    private String cpf;

    public User() {
    }

    public User(String nome, String senha, String email, String cep, String cpf) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.cep = cep;
        this.cpf = cpf;
    }

    public User(String email, String senha) {
        this.nome = email;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
