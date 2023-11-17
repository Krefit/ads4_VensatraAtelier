package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "produto")
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "descricao", nullable = false, length = 100)
    private String descricao;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            })
//    @JoinTable(name = "Produto_Materiais",
//            joinColumns = { @JoinColumn(name = "produto_id")},
//            inverseJoinColumns = { @JoinColumn(name = "material_id")}
//                )
//    private Set<Material> materiaisProduto = new HashSet<>();

    @OneToMany(mappedBy = "produto", cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JsonBackReference
    private Set<Produto_Materiais> produtosMateriais = new HashSet<>();

    public Produto(){

    }

//    public Produto(String descricao){
//        this.descricao = descricao;
//    }

    public int getId(){return id;}
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

//    public void addMaterial(Material material){
//        this.materiaisProduto.add(material);
//        material.getProdutos().add(this);
//    }
//
//    public void removeMaterial(int materialID){
//        Material material = this.materiaisProduto.stream().filter(t -> t.getId() == materialID).findFirst().orElse(null);
//        if(material != null){
//            this.materiaisProduto.remove(material);
//            material.getProdutos().remove(this);
//        }
//    }

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

    //    @OneToMany(cascade = CascadeType.ALL,
//            orphanRemoval = true)
//    private List<Material> listaMaterial = new ArrayList<>();
//
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getDescricao() {
//        return descricao;
//    }
//
//    public void setDescricao(String descricao) {
//        this.descricao = descricao;
//    }
//
//    public Integer getQuantidade() {
//        return quantidade;
//    }
//
//    public void setQuantidade(Integer quantidade) {
//        this.quantidade = quantidade;
//    }
//
//
//    public List<Material> getListaMaterial() {
//        return listaMaterial;
//    }
//
//    public void setListaMaterial(List<Material> listaMaterial, Integer produto_id) {
//        this.produto_id = produto_id;
//        this.listaMaterial = listaMaterial;
//    }
//
//    public Integer getProduto_id() {
//        return produto_id;
//    }

}
