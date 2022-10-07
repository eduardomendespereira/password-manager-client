<template>
  <div class="container">
    <h1 class="titulo" >Editar Senha</h1>

    <div class="columns" v-if="notification.ativo">
      <div class="column is-12">
        <div :class="notification.classe">
          <button @click="onClickCloseNotification()" class="delete" ></button>
          {{ notification.mensagem }}
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Descrição</label>
      <div class="control">
        <input class="input" type="text" v-model="password.description" placeholder="Descrição">
      </div>
    </div>

    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input class="input" type="text" v-model="password.url" placeholder="URL">
      </div>
    </div>

    <div class="field">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input" type="text" v-model="password.password" placeholder="Password">
      </div>
    </div>

    <div class="botoes-form">
      <router-link class="link-cad" to="/senhas">
        <button class="button btn-voltar">Voltar</button>
      </router-link>
      <button class="button btn-salvar" @click="onClickEdit()">Salvar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Password } from '@/model/password.model'
import { Notification } from '@/model/notification.model'
import { PasswordClient } from '@/client/password-client'
import {Prop} from "vue-property-decorator";

export default class FormUpdateView extends Vue {
  private passwordClient!: PasswordClient
  private password : Password = new Password()
  private notification : Notification = new Notification()
  @Prop({type: Number, required: false})
  private readonly id!: number
  public mounted(): void {
    this.passwordClient = new PasswordClient()
    this.getPassword()
  }
  private getPassword(): void {
    this.passwordClient.findById(this.id)
        .then(
            sucess => {
              this.password = sucess
            },
            error => console.log(error)
        )
  }
  private onClickEdit(): void {
    this.passwordClient.update(this.password)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Senha Editada com sucesso!!!')
              this.onClickClear()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
              this.onClickClear()
            })
  }
  private onClickCloseNotification(): void {
    this.notification = new Notification()
  }
  private onClickClear(): void {
    this.password = new Password()
  }
}
</script>

<style lang="scss">
@import "~bulma/bulma.sass";
.container{
  margin-left: 30px;
  width: 80%;
}
.titulo{
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.enums{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-block-end: 20px;
}
.enum-tipo-atendimento{
  margin-left: 40px;
}
.botoes-form{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  margin-block-end: 20px;
}
.btn-salvar{
  background-color: green;
  color: white;
  width: 40%;
}
.link-cad{
  width: 40%;
}
.btn-voltar{
  background-color: red;
  color: white;
  width: 100%;
}
</style>