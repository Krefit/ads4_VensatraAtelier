package com.casacriativa_backend.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "orcamento")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    @Column(name = "data_entrega", nullable = false)
    private Date dataEntrega;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> listProduto;
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
    @Column(name = "desconto", nullable = false)
    private BigDecimal desconto;
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "produto_id", nullable = true)
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    private List<Produto> produto;

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

    public Date getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(Date dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public List<Produto> getListProduto() {
        return listProduto;
    }

    public void setListProduto(List<Produto> listProduto) {
        this.listProduto = listProduto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getDesconto() {
        return desconto;
    }

    public void setDesconto(BigDecimal desconto) {
        this.desconto = desconto;
    }

//    public List<Produto> getProduto() {
//        return produto;
//    }
//
//    public void setProduto(List<Produto> produto) {
//        this.produto = produto;
//    }
}
