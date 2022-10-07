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
      <label class="label">Username</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="user.username" placeholder="Username">
      </div>
    </div>

    <div class="field">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="user.password" placeholder="Senha">
      </div>
    </div>

    <div class="columns">
      <div class="column is-8"></div>
      <div class="column is-2">
        <router-link class="link-cad" to="/login">
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
import { Notification } from '@/model/notification.model'
import {User} from "@/model/user.model";
import {UserClient} from "@/client/user.client";
import { getCookie, removeCookie } from "typescript-cookie";
import { AuthUtils } from '@/utils/auth-utils';

export default class FormInsertUser extends Vue {
  private userClient!: UserClient
  private notification : Notification = new Notification()
  private user: User = new User()
  private authUtils: AuthUtils = new AuthUtils()

  public mounted(): void {
    this.userClient = new UserClient()
  }

  private onClickSave(): void {
    this.userClient.save(this.user)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Usuário Cadastrado com sucesso!!!')
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
    this.user = new User()
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

