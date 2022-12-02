import { useState } from "react";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players(){

  const [team, setTeam] = useState('Team2');
  const [players, setPlayers] = useState(['Roberto', 'Fernando', 'Denilson', 'Alisson', 'Marcelo Filho', 'Joao', 'José']);

  return(
    <Container>
      <Header showBackButton />

      <HighLight 
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
          />
        <ButtonIcon icon="add" />
      </Form>      

      <HeaderList>
        <FlatList 
          data={['Team1', 'Team2', 'team3']}
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
        keyExtractor={item => item}
        renderItem={({item}) => (
          <PlayerCard 
            name={item}  
            OnRemove={() => {}}
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