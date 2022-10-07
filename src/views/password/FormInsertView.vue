<template>
  <aside class="container-content">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Cadastrar Senha
      </div>
    </div>

    <hr />

    <div class="columns" v-if="notification.ativo">
      <div class="column is-12">
        <div :class="notification.classe">
          <button @click="onClickExitNotfication()" class="delete" ></button>
          {{ notification.mensagem }}
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Descrição</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="password.description" placeholder="Descrição">
      </div>
    </div>

    <div class="field">
      <label class="label">Url</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="password.url" placeholder="URL">
      </div>
    </div>

    <div class="field">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="password.password" placeholder="Senha">
      </div>
    </div>

    <div class="field">
      <label class="label">Usuário</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="password.user" placeholder="Usuário">
      </div>
    </div>

    <div class="columns">
      <div class="column is-8"></div>
      <div class="column is-2">
        <router-link class="link-cad" to="/senhas">
          <button class="button is-danger btn-voltar">Voltar</button>
        </router-link>
      </div>
      <div class="column is-2">
        <button class="button is-fullwidth is-success" @click="onClickSave()">Salvar</button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Password } from '@/model/password.model'
import { Notification } from '@/model/notification.model'
import { PasswordClient } from '@/client/password-client'
import {User} from "@/model/user.model";
import {UserClient} from "@/client/user.client";

export default class FormInsertView extends Vue {
  private passwordClient!: PasswordClient
  private password : Password = new Password()
  private notification : Notification = new Notification()
  public mounted(): void {
    this.passwordClient = new PasswordClient()
  }
  private onClickSave(): void {
    this.passwordClient.save(this.password)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Senha Cadastrada com sucesso!!!')
              this.onClickClear()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
              this.onClickClear()
            })
  }
  private onClickExitNotfication(): void {
    this.notification = new Notification()
  }
  private onClickClear(): void {
    this.password = new Password()
  }
}
</script>

<style lang="scss">
.btn-voltar{
  width: 100%;
}
.container-content{
  width: 80%;
}
</style>

