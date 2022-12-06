import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';


export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleCreateGroup(){
    try {
      if(group.trim().length === 0){
        return Alert.alert('Aviso', 'Informe o nome da turma')
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message);
      } else{
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />
        <Button
          text="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateGroup}
        />
      </Content>
    </Container>
  );
}