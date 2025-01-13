import { Pessoa } from './../../Pessoa';
import { PessoasService } from './../../pessoas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css'
})
export class PessoasComponent implements OnInit{
  
  formulario: any;
  tituloformulario!: string;
  pessoas!: Pessoa[];
  nomePessoa!: string;
  pessoaId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeForm: boolean = false;

  modalRef!: BsModalRef ;

  constructor(private PessoasService: PessoasService, private modalService: BsModalService){}

  ngOnInit(): void {

      this.PessoasService.PegarTodos().subscribe(result => {this.pessoas = result;});

      this.tituloformulario = 'Nova Pessoa';
      this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

    ExibirFormularioCadastro(): void{
      this.visibilidadeTabela = false;
      this.visibilidadeForm = true;
      this.tituloformulario = 'Nova Pessoa';
      this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
    }

    EnviarFormulario():void{
      const pessoa : Pessoa = this.formulario.value;

      if(pessoa.pessoaId > 0){
        this.PessoasService.AtualizarPessoa(pessoa).subscribe(result => {
          this.visibilidadeForm = false;
          this.visibilidadeTabela = true;
          alert('Pessoa atualizada com sucesso');
          this.PessoasService.PegarTodos().subscribe((registros) => {
            this.pessoas = registros;
        });
        })
      }
      else
      {
        this.PessoasService.SalvarPessoa(pessoa).subscribe(result => {
          this.visibilidadeForm = false;
          this.visibilidadeTabela = true;
          alert('Pessoa inserida com sucesso');
          this.PessoasService.PegarTodos().subscribe((registros) => {
            this.pessoas = registros;
            });
          });
      }
    }

    ExibirFormularioAtualizacao(pessoaId: number): void{
      this.visibilidadeTabela = false;
      this.visibilidadeForm = true;

      this.PessoasService.PegarPeloId(pessoaId).subscribe(result => {this.tituloformulario = `Atualizar ${result.nome} ${result.sobreNome}`;

        this.formulario = new FormGroup({
          pessoaId: new FormControl(result.pessoaId),
          nome: new FormControl(result.nome),
          sobreNome: new FormControl(result.sobreNome),
          idade: new FormControl(result.idade),
          profissao: new FormControl(result.profissao)
        });
      });
    }

    Voltar():void{
      this.visibilidadeForm = false;
      this.visibilidadeTabela = true;
    }

    ExibirConfirmacaoExclusao(pessoaId:number, nomePessoa:string, conteudoModal: TemplateRef<any>):void{
      this.modalRef = this.modalService.show(conteudoModal);
      this.pessoaId = pessoaId;
      this.nomePessoa = nomePessoa;
    }

    ExcluirPessoa(pessoaId:number){
      this.PessoasService.ExcluirPessoa(pessoaId).subscribe(result => {
        this.modalRef.hide();
        alert('Pessoa excluida com sucesso!');
        this.PessoasService.PegarTodos().subscribe(registros =>{
          this.pessoas = registros;
        });
      });
    }
}
