package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.model.Produto_Materiais;
import com.casacriativa_backend.repository.MaterialRepository;
import com.casacriativa_backend.repository.ProdutoRepository;
import com.casacriativa_backend.repository.Produto_MateriaisRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProdutoController {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    private Produto_MateriaisRepository produtoMateriaisRepository;

    @GetMapping("/produto")
    public ResponseEntity<List<Produto>> getAllProdutos(@RequestParam (required= false) String descricao){
        List<Produto> produtos = new ArrayList<Produto>();

        if(descricao == null)
            produtoRepository.findAll().forEach(produtos::add);
        else
            produtoRepository.findByDescricaoContaining(descricao).forEach(produtos::add);

        if (produtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> getProdutoPorId(@PathVariable("id") int id){
        Produto produto = produtoRepository.findById(id).orElseThrow(RuntimeException::new);

        return new ResponseEntity<>(produto,HttpStatus.OK);
    }

    @GetMapping("/produto/desc/{descricao}")
    public ResponseEntity<List<Produto>> getProdutoPorDescricao(@PathVariable("descricao") String descricao){
        List<Produto> produto = new ArrayList<Produto>();

        produtoRepository.findByDescricaoContaining(descricao).forEach(produto::add);

        if(produto.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else

        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

//    @PostMapping("/produto")
//    public ResponseEntity<Produto> crieProduto(@RequestBody Produto produto){
//        Produto _produto = produtoRepository.save(new Produto(produto.getDescricao()));
//        return new ResponseEntity<>(_produto, HttpStatus.CREATED);
//    }

    @PutMapping("/produto/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable("id") int id, @RequestBody Produto produto){
        Produto _produto = produtoRepository.findById(id).orElseThrow();

        _produto.setDescricao(produto.getDescricao());

        return new ResponseEntity<>(produtoRepository.save(_produto), HttpStatus.OK);
    }

    @DeleteMapping("/produto/{id}")
    public ResponseEntity<HttpStatus> deleteProduto(@PathVariable("id") int id){
        produtoRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/produto")
    public ResponseEntity<HttpStatus> deleteTodosProdutos(){
        produtoRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping("/produto/{produtoId}/addMaterial/{materialId}")
//    public ResponseEntity<Produto> addMaterialToProduto(
//            @PathVariable("produtoId") int produtoId,
//            @PathVariable("materialId") int materialId
//    ) {
//        Produto produto = produtoRepository.findById(produtoId).orElseThrow();
//
//        Material material = materialRepository.findById(materialId).orElseThrow();
//
//        produto.addMaterial(material);
//        produtoRepository.save(produto);
//
//        return new ResponseEntity<>(produto, HttpStatus.OK);
//    }

    @PostMapping("/produto/{produtoId}/addMaterial/{materialId}")
    public ResponseEntity<Produto> addMaterialToProduto(
            @PathVariable("produtoId") int produtoId,
            @PathVariable("materialId") int materialId,
            @RequestParam("quantidade") int quantidade
    ) {
        Produto produto = produtoRepository.findById(produtoId).orElseThrow();

        Material material = materialRepository.findById(materialId).orElseThrow();

        produto.addMaterial(material, quantidade);
        produtoRepository.save(produto);

        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

    @PostMapping("/produto")
    public ResponseEntity<Produto> createProduto(@RequestBody @NotNull Produto produto) {
        // Save the Produto entity to generate its ID
        Produto savedProduto = produtoRepository.save(produto);

        for (Produto_Materiais produtoMateriais : savedProduto.getProdutosMateriais()) {
            // Fetch existing Material from database by its ID
            Material material = materialRepository.findById(produtoMateriais.getMaterial().getId()).orElse(null);

            // Check if Material exists before associating it with Produto_Materiais
            if (material != null) {
                // Associate the existing Material with Produto_Materiais
                produtoMateriais.setMaterial(material);
                produtoMateriais.setProduto(savedProduto); // Use the savedProduto

                // Save the Produto_Materiais
                produtoMateriaisRepository.save(produtoMateriais);
            }
        }

        return new ResponseEntity<>(savedProduto, HttpStatus.OK);
    }




//    private final ProdutoService produtoService;
//
//    public ProdutoController(ProdutoService produtoService) {
//        this.produtoService = produtoService;
//    }
//
//    @GetMapping
//    public List<Produto> listarProduto() {
//        return produtoService.listarProduto();
//    }
//
//    @PostMapping
//    public void createProduto(@RequestBody Produto produto) {
//        produtoService.createProduto(produto);
//    }
//
//    @PutMapping("/{id}")
//    public void editarProduto(@PathVariable("id") Integer id, @RequestBody Produto produto) {
//        produtoService.editarProduto(id, produto);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteProduto(@PathVariable("id") Integer id) {
//        produtoService.deleteProduto(id);
//    }
}
