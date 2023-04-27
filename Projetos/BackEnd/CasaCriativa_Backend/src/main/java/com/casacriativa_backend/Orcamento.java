package com.casacriativa_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int OrcaID;
    private int OrcaIDCliente;
    private Date OrcaDtInicioProd;
    private Date OrcaDtEntrega;
    private int OrcaIDProduto;
    private int OrcaQtdProduto;
    private int OrcaDesconto;



    public int getOrcaID() {
        return OrcaID;
    }

    public Orcamento setOrcaID(int orcaID) {
        OrcaID = orcaID;
        return this;
    }

    public int getOrcaIDCliente() {
        return OrcaIDCliente;
    }

    public Orcamento setOrcaIDCliente(int orcaIDCliente) {
        OrcaIDCliente = orcaIDCliente;
        return this;
    }

    public Date getOrcaDtInicioProd() {
        return OrcaDtInicioProd;
    }

    public Orcamento setOrcaDtInicioProd(Date orcaDtInicioProd) {
        OrcaDtInicioProd = orcaDtInicioProd;
        return this;
    }

    public Date getOrcaDtEntrega() {
        return OrcaDtEntrega;
    }

    public Orcamento setOrcaDtEntrega(Date orcaDtEntrega) {
        OrcaDtEntrega = orcaDtEntrega;
        return this;
    }

    public int getOrcaIDProduto() {
        return OrcaIDProduto;
    }

    public Orcamento setOrcaIDProduto(int orcaIDProduto) {
        OrcaIDProduto = orcaIDProduto;
        return this;
    }

    public int getOrcaQtdProduto() {
        return OrcaQtdProduto;
    }

    public Orcamento setOrcaQtdProduto(int orcaQtdProduto) {
        OrcaQtdProduto = orcaQtdProduto;
        return this;
    }

    public int getOrcaDesconto() {
        return OrcaDesconto;
    }

    public Orcamento setOrcaDesconto(int orcaDesconto) {
        OrcaDesconto = orcaDesconto;
        return this;
    }
}
