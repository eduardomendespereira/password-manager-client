<template>
  <div class="container">
    <h1 class="titulo" >Detalhar Senha</h1>
    <div class="field">
      <div class="control">
        <i>Id: {{password.id}}</i>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <i>Descrição: {{password.description}}</i>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <i>URL: {{password.url}}</i>
      </div>
    </div>

    <div class="botoes-form">
      <router-link class="link-voltar" to="/senhas">
        <button class="button btn-voltar">Voltar</button>
      </router-link>
      <button @click="onClickEditPage(password.id)" class="button btn-editar">Editar</button>
      <button class="button btn-desativar">Desativar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { PasswordClient } from '@/client/password-client'
import { Password } from '@/model/password.model'
export default class DetailView extends Vue {
  private passwordClient!: PasswordClient
  private password : Password = new Password()
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
  private onClickEditPage(idPassword: number){
    this.$router.push({ name: 'edit-password', params: { id: idPassword} })
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
.botoes-form{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  margin-block-end: 20px;
}
.btn-editar{
  background-color: blue;
  color: white;
  width: 30%;
}
.link-voltar{
  width: 30%;
}
.btn-voltar{
  background-color: dimgrey;
  color: white;
  width: 100%;
}
.btn-desativar{
  background-color: red;
  color: white;
  width: 30%;
}
</style>