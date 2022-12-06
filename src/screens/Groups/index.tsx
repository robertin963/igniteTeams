import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';

import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  async function fetchGroups(){
    try {
     const grps = await groupsGetAll();
     setGroups(grps);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNewGroup(){
    navigation.navigate('new');
  }

  // useEffect(() => {
  //   fetchGroups();
  // }, [groups]);

  useFocusEffect(useCallback(() => {
    fetchGroups();
  },[]));

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
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <Button 
        text='Criar nova turma' 
        onPress={handleNewGroup}
      />
    </Container>
  );
}
