package com.casacriativa_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nome_cliente", nullable = false, length = 50)
    private String nome;
    @Column(name = "cpf", nullable = false, length = 20)
    private String cpf;
    @Column(name = "endereco_cliente", nullable = false, length = 100)
    private String endereco;
    @Column(name = "email", nullable = false, length = 50)
    private String email;
    @Column(name = "telefone_cliente", nullable = false, length = 50)
    private String telefone;

    @OneToMany(mappedBy = "cliente") // Assuming the property name in Orcamento is 'cliente'
    @JsonIgnore
    private Set<Orcamento> orcamentos = new HashSet<>();

    public Integer getId() {
        return id;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Set<Orcamento> getOrcamentos() {
        return orcamentos;
    }

    public void setOrcamentos(Set<Orcamento> orcamentos) {
        this.orcamentos = orcamentos;
    }
}
