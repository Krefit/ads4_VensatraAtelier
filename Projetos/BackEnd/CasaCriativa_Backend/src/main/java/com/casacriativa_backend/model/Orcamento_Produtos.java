package com.casacriativa_backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity(name = "Orcamento_Produtos")
@Table(name = "Orcamento_Produtos")
public class Orcamento_Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    @JsonBackReference
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "orcamento_id")
    @JsonBackReference
    private Orcamento orcamento;

    @Column(name = "quantidade", nullable = false, length = 50)
    private int quantidade;

    @Column(name = "totalOrcamento", nullable = true)
    private double totalOrcamento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Orcamento getOrcamento() {
        return orcamento;
    }

    public void setOrcamento(Orcamento orcamento) {
        this.orcamento = orcamento;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getTotalOrcamento() {
        return totalOrcamento;
    }

    public void setTotalOrcamento(double totalOrcamento) {
        this.totalOrcamento = totalOrcamento;
    }
}
