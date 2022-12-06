import { useState, useEffect, useRef } from "react";
import { FlatList, Alert, Keyboard, TextInput  } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

type RoutesParamsProps = {
  group: string;
}

export function Players(){

  const [team, setTeam] = useState('TIME A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [playerName, setPlayerName] = useState('');

  const route = useRoute();

  const { group } = route.params as RoutesParamsProps;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function fetchPlayersByTeam(){
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team); 
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');
    }
  }

  async function  handleAddPlayer() {
   if(playerName.trim().length === 0){
    return Alert.alert('Jogadores', 'Informe o nome da pessoa para adicionar.');
   }
   const newPlayer = {
    name: playerName,
    team: team
   }

   try {
    await playerAddByGroup(newPlayer, group);
    newPlayerNameInputRef.current?.blur();
    setPlayerName('');
    fetchPlayersByTeam();   
    Keyboard.dismiss(); 
   } catch (error) {
    if(error instanceof AppError){
      Alert.alert('Nova Pessoa', error.message);
    }else{
      Alert.alert('Nova Pessoa', 'Houve um erro ao salvar uma nova pessoa.');
      console.log(error);
    }
   }
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);    
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.') ;
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  },[team]);

  return(
    <Container>
      <Header showBackButton />

      <HighLight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          onChangeText={setPlayerName}
          value={playerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
          />
        <ButtonIcon 
          icon="add" 
          onPress={handleAddPlayer}
        />
      </Form>      

      <HeaderList>
        <FlatList 
          data={['TIME A', 'TIME B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter 
            title={item} 
            isActive={item === team}
            onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard 
            name={item.name}  
            OnRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty 
            message="Não já pessoas nesse time."
          />
        }
        contentContainerStyle={[
          {paddingBottom : 100},
          players.length === 0 && {flex: 1}
        ]}
      />

      <Button 
      text="Remover Turma"
      type="SECONDARY"
      />

    </Container>
  );
}