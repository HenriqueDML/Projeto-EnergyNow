package br.com.energynow.DTO;

import br.com.energynow.model.Gerenciamento;

public class GerenciamentoDTO {
    private int id;
    private String data;
    private int kWh;
    private double precokWhN;//precokWh Normal
    private double precokWhE;//precokWh se a pessoa economisar
    private double precokWhR;//precokWh se a pessoa utilizar energia renovavel(Placa solar)
    private String email;
    private String month;
    private double economiaE;
    private double economiaR;

    public GerenciamentoDTO() {
    }

    public GerenciamentoDTO(int id , String data , int kWh , double precokWhN , double precokWhE , double precokWhR , String email, String month) {
        this.id = id;
        this.data = data;
        this.kWh = kWh;
        this.precokWhN = precokWhN;
        this.precokWhE = precokWhE;
        this.precokWhR = precokWhR;
        this.email = email;
        this.month = month;
    }

    public GerenciamentoDTO(int id, String data , int kWh , String email) {
        this.id = id;
        this.data = data;
        this.kWh = kWh;
        this.email = email;
    }

    public GerenciamentoDTO(Gerenciamento geren) {
        this.id = geren.getId ();
        this.data = geren.getData ();
        this.kWh = geren.getkWh ();
        this.email = geren.getEmail ();
    }

    public GerenciamentoDTO(GerenciamentoDTO geren) {
        this.kWh = geren.getkWh ();
        this.email = geren.getEmail ();
    }

    public double getEconomiaR() {
        return economiaR;
    }

    public void setEconomiaR(double economiaR) {
        this.economiaR = economiaR;
    }

    public double getEconomiaE() {
        return economiaE;
    }

    public void setEconomiaE(double economia) {
        this.economiaE = economia;
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

    public double getPrecokWhN() {
        return precokWhN;
    }

    public void setPrecokWhN(double precokWhN) {
        this.precokWhN = precokWhN;
    }

    public double getPrecokWhE() {
        return precokWhE;
    }

    public void setPrecokWhE(double precokWhE) {
        this.precokWhE = precokWhE;
    }

    public double getPrecokWhR() {
        return precokWhR;
    }

    public void setPrecokWhR(double precokWhR) {
        this.precokWhR = precokWhR;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
