package com.casacriativa_backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "nomeFoto")
    private String nomeFoto;
    @Column(name = "descricao", nullable = false, length = 100)
    private String descricao;

    @Column(name = "quantidade")
    private Integer quantidade;
    @Column(name = "preco")
    private Float preco;

    @OneToMany(mappedBy = "produto", cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.ALL
            })
    @JsonBackReference
    @JsonManagedReference
    private Set<Produto_Materiais> produtosMateriais = new HashSet<>();

    public Produto(){

    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNomeFoto() {
        return nomeFoto;
    }

    public void setNomeFoto(String nomeFoto) {
        this.nomeFoto = nomeFoto;
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

    public int getId(){return id;}
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }


    public List<Material> getMaterials() {
        List<Material> materials = new ArrayList<>();
        for (Produto_Materiais pm : produtosMateriais) {
            materials.add(pm.getMaterial());
        }
        return materials;
    }


    public Set<Produto_Materiais> getProdutosMateriais() {
        return produtosMateriais;
    }

    public void setProdutosMateriais(Set<Produto_Materiais> produtosMateriais) {
        this.produtosMateriais = produtosMateriais;
    }

    public void addMaterial(Material material, int quantidade) {
        Produto_Materiais produtoMaterial = new Produto_Materiais();
        produtoMaterial.setProduto(this);
        produtoMaterial.setMaterial(material);
        produtoMaterial.setQuantidade(quantidade);

        produtosMateriais.add(produtoMaterial);

        material.addProdutoMateriais(produtoMaterial);
    }

    public void addProdutoMateriais(Produto_Materiais produtoMateriais) {
        produtoMateriais.setProduto(this);
        this.produtosMateriais.add(produtoMateriais);
    }

    public void removeMaterial(int materialId) {
        produtosMateriais.removeIf(produtoMateriais -> produtoMateriais.getMaterial().getId().equals(materialId));
    }

}
