<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Senhas
    </div>
  </div>

  <hr />

  <div class="columns">
    <div class="column is-9">
      <input class="input" type="filtro" placeholder="Descrição">
    </div>
    <div class="column is-2">
      <router-link class="link-cad" to="/senhas/cadastrar">
        <button class="button btn-cadastrar" style="background-color: green; color: white">Inserir Senha</button>
      </router-link>
    </div>
  </div>

  <hr />

  <table class="table table is-fullwidth">
    <thead class="green">
    <tr style="background-color: #2c3e50">
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Ativo</th>
      <th style="color: #fff;">Descrição</th>
      <th style="color: #fff;">Url</th>
      <th style="color: #fff;">Senha</th>
      <th style="color: #fff;">Opções</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in passwordList" :key="item.id">
      <th>{{ item.id }}</th>

      <th>
        <span v-if="!item.inactive" class="tag is-success"> Ativa </span>
        <span v-if="item.inactive" class="tag is-danger"> Inativa </span>
      </th>

      <th>{{ item.description }}</th>
      <th>{{ item.url }}</th>
      <th>{{ item.password }}</th>
      <th>
        <button @click="onClickDetailPage(item.id)" style="background-color: dodgerblue; color: white" class="button btn-detalhar">Detalhar</button>
      </th>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'
import { Password } from '@/model/password.model'
import { PasswordClient } from '@/client/password-client'

export default class PasswordListView extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Password> = new PageResponse()
  private passwordList: Password[] = []
  private passwordClient!: PasswordClient
  public mounted(): void {
    this.passwordClient = new PasswordClient()
    this.listPasswords()
  }
  private listPasswords(): void {
    this.passwordClient.findByAll(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.passwordList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }
  private onClickDetailPage(id: number){
    this.$router.push({ name: 'detail-password', params: { id: id} })
  }
}
</script>