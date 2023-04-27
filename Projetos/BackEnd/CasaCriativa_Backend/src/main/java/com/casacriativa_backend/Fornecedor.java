package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int FornID;
    String FornNome;
    String FornCNPJ;
    String FornEndereco;
    String FornTelefone;
    String FornEstado;
    String FornCidade;

    public int getFornID() {
        return FornID;
    }

    public Fornecedor setFornID(int fornID) {
        FornID = fornID;
        return this;
    }

    public String getFornNome() {
        return FornNome;
    }

    public Fornecedor setFornNome(String fornNome) {
        FornNome = fornNome;
        return this;
    }

    public String getFornCNPJ() {
        return FornCNPJ;
    }

    public Fornecedor setFornCNPJ(String fornCNPJ) {
        FornCNPJ = fornCNPJ;
        return this;
    }

    public String getFornEndereco() {
        return FornEndereco;
    }

    public Fornecedor setFornEndereco(String fornEndereco) {
        FornEndereco = fornEndereco;
        return this;
    }

    public String getFornTelefone() {
        return FornTelefone;
    }

    public Fornecedor setFornTelefone(String fornTelefone) {
        FornTelefone = fornTelefone;
        return this;
    }

    public String getFornEstado() {
        return FornEstado;
    }

    public Fornecedor setFornEstado(String fornEstado) {
        FornEstado = fornEstado;
        return this;
    }

    public String getFornCidade() {
        return FornCidade;
    }

    public Fornecedor setFornCidade(String fornCidade) {
        FornCidade = fornCidade;
        return this;
    }
}
