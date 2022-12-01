import { useState } from 'react';
import { FlatList } from 'react-native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';

import { Container } from './style';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera do Roberto', 'Galera da Duda', 'Amigos', 'Família']);

  return (
    <Container>
      <Header />
      <HighLight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
      />
      <Button text='Criar nova turma' />
    </Container>
  );
}
