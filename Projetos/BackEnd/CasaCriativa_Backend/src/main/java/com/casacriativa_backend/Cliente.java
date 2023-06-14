package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int CliID;
    String CliNome;
    String CliCPF_CNPJ;
    String CliEndereco;
    Date CliDtNascimento;

    public int getCliID() {
        return CliID;
    }

    public Cliente setCliID(int cliID) {
        CliID = cliID;
        return this;
    }

    public String getCliNome() {
        return CliNome;
    }

    public Cliente setCliNome(String cliNome) {
        CliNome = cliNome;
        return this;
    }

    public String getCliCPF_CNPJ() {
        return CliCPF_CNPJ;
    }

    public Cliente setCliCPF_CNPJ(String cliCPF_CNPJ) {
        CliCPF_CNPJ = cliCPF_CNPJ;
        return this;
    }

    public String getCliEndereco() {
        return CliEndereco;
    }

    public Cliente setCliEndereco(String cliEndereco) {
            CliEndereco = cliEndereco;
        return this;
    }

    public Date getCliDtNascimento() {
        return CliDtNascimento;
    }

    public Cliente setCliDtNascimento(Date cliDtNascimento) {
        CliDtNascimento = cliDtNascimento;
        return this;
    }

    public String getCliEmail() {
        return CliEmail;
    }

    public Cliente setCliEmail(String cliEmail) {
        CliEmail = cliEmail;
        return this;
    }

    public String getCliTelefone() {
        return CliTelefone;
    }

    public Cliente setCliTelefone(String cliTelefone) {
        CliTelefone = cliTelefone;
        return this;
    }

    String CliEmail;
    String CliTelefone;
}
