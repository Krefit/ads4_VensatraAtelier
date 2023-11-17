package com.casacriativa_backend.model;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class Produto_MateriaisId {

    private static final long serialVersionUID = 1L;

    private int produtoId;
    private int materialId;

    public Produto_MateriaisId(){}

    public Produto_MateriaisId(int produtoId, int materialId){
        super();
        this.produtoId = produtoId;
        this.materialId = materialId;
    }

    public int getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(int produtoId) {
        this.produtoId = produtoId;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

    @Override
    public boolean equals(Object obj){
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Produto_MateriaisId other = (Produto_MateriaisId) obj;
        return Objects.equals(getProdutoId(), other.getProdutoId()) && Objects.equals(getMaterialId(), other.getMaterialId());
    }
}
