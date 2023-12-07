package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orcamento")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    @Column(name = "data_entrega", nullable = true)
    private LocalDateTime dataEntrega;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;
    @Column(name = "desconto", nullable = false)
    private BigDecimal desconto;

    @Column(name="descricao", nullable = true)
    private String descricao;

    @OneToMany(mappedBy = "orcamento")
    @JsonManagedReference
    @JsonIgnore
    private Set<Orcamento_Produtos> orcamentoProdutos = new HashSet<>();


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDateTime getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDateTime dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getDesconto() {
        return desconto;
    }

    public void setDesconto(BigDecimal desconto) {
        this.desconto = desconto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = cliente.getNome();
    }

    public Set<Orcamento_Produtos> getOrcamentoProdutos() {
        return orcamentoProdutos;
    }

    public void setOrcamentoProdutos(Set<Orcamento_Produtos> orcamentoProdutos) {
        this.orcamentoProdutos = orcamentoProdutos;
    }

    public void addProduto(Produto produto, int quantidade){
        Orcamento_Produtos orcamentoProdutos = new Orcamento_Produtos();
        orcamentoProdutos.setOrcamento(this);
        orcamentoProdutos.setProduto(produto);
        orcamentoProdutos.setQuantidade(quantidade);
        //orcamentoProdutos.setTotalOrcamento();

        produto.addOrcamentoProdutos(orcamentoProdutos);
    }

    public void addOrcamentoProdutos(Orcamento_Produtos orcamentoProdutos){
        orcamentoProdutos.setOrcamento(this);
        this.orcamentoProdutos.add(orcamentoProdutos);
    }

    public void removeProduto(int produtoId){
        orcamentoProdutos.removeIf(orcamentoProdutos -> orcamentoProdutos.getProduto().getId().equals(produtoId));
    }
}
