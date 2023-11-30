package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "produto")
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "descricao", nullable = false, length = 100)
    private String descricao;


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
