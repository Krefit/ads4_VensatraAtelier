package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int FornID;
    private String FornNome;
    private String FornCNPJ;
    private String FornEndereco;
    private String FornTelefone;
    private String FornEstado;
    private String FornCidade;

    public int getFornID() {
        return FornID;
    }

    public void setFornID(int fornID) {
        FornID = fornID;
    }

    public String getFornNome() {
        return FornNome;
    }

    public void setFornNome(String fornNome) {
        FornNome = fornNome;
    }

    public String getFornCNPJ() {
        return FornCNPJ;
    }

    public void setFornCNPJ(String fornCNPJ) {
        FornCNPJ = fornCNPJ;
    }

    public String getFornEndereco() {
        return FornEndereco;
    }

    public void setFornEndereco(String fornEndereco) {
        FornEndereco = fornEndereco;
    }

    public String getFornTelefone() {
        return FornTelefone;
    }

    public void setFornTelefone(String fornTelefone) {
        FornTelefone = fornTelefone;
    }

    public String getFornEstado() {
        return FornEstado;
    }

    public void setFornEstado(String fornEstado) {
        FornEstado = fornEstado;
    }

    public String getFornCidade() {
        return FornCidade;
    }

    public void setFornCidade(String fornCidade) {
        FornCidade = fornCidade;
    }
}
