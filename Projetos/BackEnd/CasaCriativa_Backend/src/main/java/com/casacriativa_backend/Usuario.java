package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int UsrId;
    private int UsrCpf;
    private int UsrCnpj;
    private String UsrNome;
    private String UsrEmail;
    private String UsrTelefone;
    private String UsrDescricao;
    private double UsrMaoObraValor;
    private double UsrMaoObraHoras;
    private int UsrMaoObraDiasMes;
    private int UsrIdLogin;

    private double valorHora;

    public int getUsrId() {
        return UsrId;
    }

    public void setUsrId(int usrId) {
        UsrId = usrId;
    }

    public int getUsrCpf() {
        return UsrCpf;
    }

    public void setUsrCpf(int usrCpf) {
        UsrCpf = usrCpf;
    }

    public int getUsrCnpj() {
        return UsrCnpj;
    }

    public void setUsrCnpj(int usrCnpj) {
        UsrCnpj = usrCnpj;
    }

    public String getUsrNome() {
        return UsrNome;
    }

    public void setUsrNome(String usrNome) {
        UsrNome = usrNome;
    }

    public String getUsrEmail() {
        return UsrEmail;
    }

    public void setUsrEmail(String usrEmail) {
        UsrEmail = usrEmail;
    }

    public String getUsrTelefone() {
        return UsrTelefone;
    }

    public void setUsrTelefone(String usrTelefone) {
        UsrTelefone = usrTelefone;
    }

    public String getUsrDescricao() {
        return UsrDescricao;
    }

    public void setUsrDescricao(String usrDescricao) {
        UsrDescricao = usrDescricao;
    }

    public double getUsrMaoObraValor() {
        return UsrMaoObraValor;
    }

    public void setUsrMaoObraValor(double usrMaoObraValor) {
        UsrMaoObraValor = usrMaoObraValor;
    }

    public double getUsrMaoObraHoras() {
        return UsrMaoObraHoras;
    }

    public void setUsrMaoObraHoras(double usrMaoObraHoras) {
        UsrMaoObraHoras = usrMaoObraHoras;
    }

    public int getUsrMaoObraDiasMes() {
        return UsrMaoObraDiasMes;
    }

    public void setUsrMaoObraDiasMes(int usrMaoObraDiasMes) {
        UsrMaoObraDiasMes = usrMaoObraDiasMes;
    }

    public int getUsrIdLogin() {
        return UsrIdLogin;
    }

    public void setUsrIdLogin(int usrIdLogin) {
        UsrIdLogin = usrIdLogin;
    }

    public double valorHoraTrabalhada(){
        valorHora = UsrMaoObraValor/UsrMaoObraDiasMes; //Recebendo o valor por dia

        valorHora = valorHora/UsrMaoObraHoras;

        return valorHora;
    }
}
