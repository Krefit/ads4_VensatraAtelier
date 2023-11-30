package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "descricao", length = 50)
    private String descricao;
    @Column(name = "preco", nullable = false, length = 50)
    private Float preco;
    @Column(name = "quantidade", nullable = false, length = 50)
    private Integer quantidade;

    @OneToMany(mappedBy = "material")
    @JsonManagedReference
    @JsonIgnore
    private Set<Produto_Materiais> materiaisProdutos  = new HashSet<>();

    public Material() {

    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }


    public void addProdutoMateriais(Produto_Materiais produtoMateriais) {
        produtoMateriais.setMaterial(this);
        this.materiaisProdutos.add(produtoMateriais);
    }

    public void removeMaterial(int materialId) {
        materiaisProdutos.removeIf(produtoMateriais -> produtoMateriais.getMaterial().getId().equals(materialId));
    }
}
