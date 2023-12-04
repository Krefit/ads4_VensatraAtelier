package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity(name = "Produto_Materiais")
@Table(name = "Produto_Materiais")
public class Produto_Materiais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    @JsonBackReference
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "material_id")
    @JsonBackReference
    private Material material;

    @Column(name = "quantidade", nullable = false, length = 50)
    private int quantidade;

// --Commented out by Inspection START (03/12/2023 10:15):
//// --Commented out by Inspection START (03/12/2023 10:15):
////    public Long getId() {
////        return id;
////    }
// --Commented out by Inspection STOP (03/12/2023 10:15)
// --Commented out by Inspection START (03/12/2023 10:15):
//// --Commented out by Inspection STOP (03/12/2023 10:15)
//
//    public void setId(Long id) {
// --Commented out by Inspection STOP (03/12/2023 10:15)
//        this.id = id;
//    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    
}
