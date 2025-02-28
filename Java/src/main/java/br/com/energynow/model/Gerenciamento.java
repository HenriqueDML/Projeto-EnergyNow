package br.com.energynow.model;

import br.com.energynow.DTO.GerenciamentoDTO;

public class Gerenciamento {
    private int id;
    private String data;
    private int kWh;
    private String email;
    private String uf;

    public Gerenciamento() {
    }

    public Gerenciamento(int id , String data , int kWh , String email , String uf) {
        this.id = id;
        this.data = data;
        this.kWh = kWh;
        this.email = email;
        this.uf = uf;
    }

    public Gerenciamento(String data , int kWh , String email) {
        this.data = data;
        this.kWh = kWh;
        this.email = email;
    }

    public Gerenciamento(GerenciamentoDTO gerenDTO) {
        this.id = gerenDTO.getId ();
        this.data = gerenDTO.getData ();
        this.kWh = gerenDTO.getkWh ();
        this.email = gerenDTO.getEmail ();
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getkWh() {
        return kWh;
    }

    public void setkWh(int kWh) {
        this.kWh = kWh;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }
}
