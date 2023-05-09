package com.casacriativa_backend;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ProdId;
    private String ProdCategoria;
    private String ProdDescricao;
    private int ProdIdMaterial;
    private int ProdQtdMaterial;
    private int ProdTempoMaoObra;
    private float ProdCustoExtra;
    private int ProdPorcentLucro;
    private int ProdIdFornecedor;

    public int getProdId() {
        return ProdId;
    }

    public void setProdId(int prodId) {
        ProdId = prodId;
    }

    public String getProdCategoria() {
        return ProdCategoria;
    }

    public void setProdCategoria(String prodCategoria) {
        ProdCategoria = prodCategoria;
    }

    public String getProdDescricao() {
        return ProdDescricao;
    }

    public void setProdDescricao(String prodDescricao) {
        ProdDescricao = prodDescricao;
    }

    public int getProdIdMaterial() {
        return ProdIdMaterial;
    }

    public void setProdIdMaterial(int prodIdMaterial) {
        ProdIdMaterial = prodIdMaterial;
    }

    public int getProdQtdMaterial() {
        return ProdQtdMaterial;
    }

    public void setProdQtdMaterial(int prodQtdMaterial) {
        ProdQtdMaterial = prodQtdMaterial;
    }

    public int getProdTempoMaoObra() {
        return ProdTempoMaoObra;
    }

    public void setProdTempoMaoObra(int prodTempoMaoObra) {
        ProdTempoMaoObra = prodTempoMaoObra;
    }

    public float getProdCustoExtra() {
        return ProdCustoExtra;
    }

    public void setProdCustoExtra(float prodCustoExtra) {
        ProdCustoExtra = prodCustoExtra;
    }

    public int getProdPorcentLucro() {
        return ProdPorcentLucro;
    }

    public void setProdPorcentLucro(int prodPorcentLucro) {
        ProdPorcentLucro = prodPorcentLucro;
    }

    public int getProdIdFornecedor() {
        return ProdIdFornecedor;
    }

    public void setProdIdFornecedor(int prodIdFornecedor) {
        ProdIdFornecedor = prodIdFornecedor;
    }
}
