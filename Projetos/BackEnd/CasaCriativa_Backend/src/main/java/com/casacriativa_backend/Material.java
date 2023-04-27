package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int MatID;
    private String MatDescricao;
    private Float MatPreco;
    private int MatQuantidade;


    public int getMatID() {
        return MatID;
    }

    public Material setMatID(int matID) {
        MatID = matID;
        return this;
    }

    public String getMatDescricao() {
        return MatDescricao;
    }

    public Material setMatDescricao(String matDescricao) {
        MatDescricao = matDescricao;
        return this;
    }

    public Float getMatPreco() {
        return MatPreco;
    }

    public Material setMatPreco(Float matPreco) {
        MatPreco = matPreco;
        return this;
    }

    public int getMatQuantidade() {
        return MatQuantidade;
    }

    public Material setMatQuantidade(int matQuantidade) {
        MatQuantidade = matQuantidade;
        return this;
    }
}
