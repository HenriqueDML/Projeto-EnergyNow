package br.com.energynow.Service;

import br.com.energynow.DAO.GerenciamentoDao;
import br.com.energynow.DAO.PrecoKWHDao;
import br.com.energynow.DAO.UserDao;
import br.com.energynow.DTO.CalcuraloraGerenDTO;
import br.com.energynow.DTO.GerenciamentoDTO;
import br.com.energynow.model.Gerenciamento;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GerenciamentoService {
    GerenciamentoDao d = new GerenciamentoDao ();

    public void create (GerenciamentoDTO gerenDTO) throws SQLException {
        UserDao dUser = new UserDao();
        Gerenciamento geren = new Gerenciamento (gerenDTO);

        geren.setUf (indentificadorUF (dUser.readCep (gerenDTO.getEmail ())));
        d.create (geren);
    }

    public void createGrupo(CalcuraloraGerenDTO calculadora) throws SQLException {
        UserDao dUser = new UserDao();
        LocalDate date = LocalDate.now ();

        int month = date.getMonthValue ();
        int year = date.getYear ();

        Gerenciamento geren1 = new Gerenciamento (""+month+"-"+year, calculadora.getkWh1 () , calculadora.getEmail ());
        geren1.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));

        if(month - 1 > 1){
            String month1 = String.valueOf (month -1);
            Gerenciamento geren2 = new Gerenciamento (month1+"-"+year, calculadora.getkWh2 () , calculadora.getEmail ());
            geren2.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));

            if(month - 2 > 1){
                String month2 = String.valueOf (month -2);
                Gerenciamento geren3 = new Gerenciamento (month2+"-"+year, calculadora.getkWh3 () , calculadora.getEmail ());
                geren3.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));

                d.create (geren3);
                d.create (geren2);
                d.create (geren1);
            }else {
                String month2 = "12";
                String year1 = String.valueOf (year - 1);
                Gerenciamento geren3 = new Gerenciamento (month2+"-"+year1, calculadora.getkWh3 () , calculadora.getEmail ());
                geren1.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));;

                d.create (geren3);
                d.create (geren2);
                d.create (geren1);
            }
        }else {
            String month1 = "12";
            String year1 = String.valueOf (year - 1);
            Gerenciamento geren2 = new Gerenciamento (month1+"-"+year1, calculadora.getkWh2 () , calculadora.getEmail ());
            geren1.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));

            String month2 = "11";
            Gerenciamento geren3 = new Gerenciamento (month2 + "-" + year1 , calculadora.getkWh3 () , calculadora.getEmail ());
            geren1.setUf (indentificadorUF (dUser.readCep (calculadora.getEmail ())));

            d.create (geren3);
            d.create (geren2);
            d.create (geren1);
        }


    }


    public List<GerenciamentoDTO> getList (String email, int nplacas) throws SQLException {
        UserDao dUser = new UserDao();

        List<GerenciamentoDTO> list = new ArrayList<> ();
        List<Gerenciamento> l = d.readList (email);
        int mediakWh = 0;
        int n = 0;

        if (l.size () > 3){
            l.sort ((n1,n2) -> Integer.compare (n1.getId () , n2.getId ()));
            List<Gerenciamento> l2 = l.subList (Math.max (l.size () - 3, 0), l.size ());

            for (int i = 0; i <= 2; ++i){
                GerenciamentoDTO geren = new GerenciamentoDTO (l2.get (i));

                //Metodos para calcular os valores
                double p = precoUF (indentificadorUF (dUser.readCep (email)));
                geren.setPrecokWhN (precoN (p, geren.getkWh ()));
                geren.setPrecokWhE (precoCE (p,geren.getkWh()));
                geren.setPrecokWhR (precoCP (p, geren.getkWh () , nplacas));
                //metodo para pegar o month
                geren.setMonth (transformaMes(geren.getData ()));
                list.add (geren);

                mediakWh = mediakWh + geren.getkWh ();
                n = n+1;
            }
        }else {
            for (int i = 0; i < l.size (); ++i){
                GerenciamentoDTO geren = new GerenciamentoDTO (l.get (i));

                //Metodos para calcular os valores
                double p = precoUF (indentificadorUF (dUser.readCep (email)));
                geren.setPrecokWhN (precoN (p, geren.getkWh ()));
                geren.setPrecokWhE (precoCE (p,geren.getkWh()));
                geren.setPrecokWhR (precoCP (p, geren.getkWh () , nplacas));
                //metodo para pegar o month
                geren.setMonth (transformaMes(geren.getData ()));
                list.add (geren);

                mediakWh = mediakWh + geren.getkWh ();
                n = n+1;
            }
        }

        GerenciamentoDTO geren = new GerenciamentoDTO ();

        geren.setkWh (mediakWh/n);
        double p = precoUF (indentificadorUF (dUser.readCep (email)));
        geren.setPrecokWhN (precoN (p, geren.getkWh ()));
        geren.setPrecokWhE (precoCE (p,geren.getkWh()));
        geren.setPrecokWhR (precoCP (p, geren.getkWh () , nplacas));
        geren.setMonth ("Próximo Mês");
        geren.setEconomiaE (geren.getPrecokWhN () - geren.getPrecokWhE ());
        geren.setEconomiaR (geren.getPrecokWhN () - geren.getPrecokWhR ());
        list.add (geren);

        return list;
    }

    public void update (GerenciamentoDTO gerenDTO) throws SQLException{
        UserDao dUser = new UserDao();
        Gerenciamento geren = new Gerenciamento (gerenDTO);

        geren.setUf (indentificadorUF (dUser.readCep (gerenDTO.getEmail ())));
        d.update (geren);
    }

    public void delete (int id) throws SQLException {
        d.delete (id);
    }


    //metodo para indentificar o UF do CEP
    private static String indentificadorUF(String cep){
        // Remover qualquer caractere não numérico, caso o CEP tenha pontos ou traços.
        cep = cep.replaceAll("[^0-9]", "");

        // Verificar se o CEP tem 8 dígitos
        if (cep.length() != 8) {
            return "CEP inválido";
        }

        // Converter o CEP para um número inteiro
        int cepInt = Integer.parseInt(cep);

        // Identificar o estado com base no CEP
        if (cepInt >= 1000000 && cepInt <= 19999999) {
            return "SP";
        } else if (cepInt >= 20000000 && cepInt <= 28999999) {
            return "RJ";
        } else if (cepInt >= 29000000 && cepInt <= 29999999) {
            return "ES";
        } else if (cepInt >= 30000000 && cepInt <= 39999999) {
            return "MG";
        } else if (cepInt >= 40000000 && cepInt <= 48999999) {
            return "BA";
        } else if (cepInt >= 49000000 && cepInt <= 49999999) {
            return "SE";
        } else if (cepInt >= 50000000 && cepInt <= 56999999) {
            return "PE";
        } else if (cepInt >= 57000000 && cepInt <= 57999999) {
            return "AL";
        } else if (cepInt >= 58000000 && cepInt <= 58999999) {
            return "PB";
        } else if (cepInt >= 59000000 && cepInt <= 59999999) {
            return "RN";
        } else if (cepInt >= 60000000 && cepInt <= 63999999) {
            return "CE";
        } else if (cepInt >= 64000000 && cepInt <= 64999999) {
            return "PI";
        } else if (cepInt >= 65000000 && cepInt <= 65999999) {
            return "MA";
        } else if (cepInt >= 66000000 && cepInt <= 68899999) {
            return "PA";
        } else if (cepInt >= 68900000 && cepInt <= 68999999) {
            return "AP";
        } else if (cepInt >= 69000000 && cepInt <= 69299999) {
            return "AM";
        } else if (cepInt >= 69300000 && cepInt <= 69389999) {
            return "RR";
        } else if (cepInt >= 69900000 && cepInt <= 69999999) {
            return "AC";
        } else if (cepInt >= 70000000 && cepInt <= 73699999) {
            return "DF";
        } else if (cepInt >= 72800000 && cepInt <= 76799999) {
            return "GO";
        } else if (cepInt >= 77000000 && cepInt <= 77995999) {
            return "TO";
        } else if (cepInt >= 78000000 && cepInt <= 78899999) {
            return "MT";
        } else if (cepInt >= 78900000 && cepInt <= 78930999) {
            return "RO";
        } else if (cepInt >= 78931000 && cepInt <= 79999999) {
            return "MS";
        } else if (cepInt >= 80000000 && cepInt <= 82999999) {
            return "PR";
        }else {
            System.out.println ("Estado não encontrado");
            return "";
        }
    }

    //metodos para descobrir os preço da conta de luz com os 3 variaçoes(Normal, Com economia e Com placas solares)
    private double precoUF(String uf) throws SQLException {
        PrecoKWHDao precoKWHDao = new PrecoKWHDao ();
        return precoKWHDao.getPreco (uf);
    }

    //Normal
    private double precoN(double ufpreco, int kWh ){
        return ufpreco * kWh;
    }

    //Com habitos de economia
    private double precoCE(double ufpreco, int kWh){
        return (ufpreco * kWh) - (ufpreco * kWh)*0.2;
    }

    //Com placa solar gerando 65 kWh por mes
    private double precoCP(double ufpreco, int kWh, int nPlacasSolares){
        int resultkWh = kWh - (65 * nPlacasSolares);
        return ufpreco * resultkWh;
    }

    //metodos para transformar mes(Numero) em mes(Nome)
    private static String transformaMes (String data){
        String[] months = {
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        };

        int nDMes = Integer.parseInt (data.substring (5, data.length () -3));

        return months[nDMes - 1];
    }

}
