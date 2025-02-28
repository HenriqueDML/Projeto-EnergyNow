package br.com.energynow.DTO;

public class CalcuraloraGerenDTO {
    private int kWh1;
    private int kWh2;
    private int kWh3;
    private String email;

    public CalcuraloraGerenDTO() {
    }

    public CalcuraloraGerenDTO(int kWh1 , int kWh2 , int kWh3 , String email) {
        this.kWh1 = kWh1;
        this.kWh2 = kWh2;
        this.kWh3 = kWh3;
        this.email = email;
    }

    public int getkWh1() {
        return kWh1;
    }

    public void setkWh1(int kWh1) {
        this.kWh1 = kWh1;
    }

    public int getkWh2() {
        return kWh2;
    }

    public void setkWh2(int kWh2) {
        this.kWh2 = kWh2;
    }

    public int getkWh3() {
        return kWh3;
    }

    public void setkWh3(int kWh3) {
        this.kWh3 = kWh3;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
