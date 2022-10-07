<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Usuários
    </div>
  </div>

  <hr />

  <div class="columns">
    <div class="column is-9">
      <input class="input" type="filtro" placeholder="Nome">
    </div>
    <div class="column is-2">
      <router-link class="link-cad" to="/usuarios/cadastrar">
        <button class="button btn-cadastrar" style="background-color: green; color: white">Inserir Usuário</button>
      </router-link>
    </div>
  </div>

  <hr />

  <table class="table table is-fullwidth">
    <thead class="green">
    <tr style="background-color: mediumpurple">
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Ativo</th>
      <th style="color: #fff;">Username</th>
      <th style="color: #fff;">Senha</th>
      <th style="color: #fff;">Opções</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in userList" :key="item.id">
      <th>{{ item.id }}</th>

      <th>
        <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
        <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
      </th>

      <th>{{ item.username }}</th>
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
import { User } from '@/model/user.model'
import { UserClient } from '@/client/user.client'

export default class UserListView extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<User> = new PageResponse()
  private userList: User[] = []
  private userClient!: UserClient
  public mounted(): void {
    this.userClient = new UserClient()
    this.listUsers()
  }
  private listUsers(): void {
    this.userClient.findByAll(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.userList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }
  private onClickDetailPage(id: number){
    this.$router.push({ name: 'detail-user', params: { id: id} })
  }
}
</script>