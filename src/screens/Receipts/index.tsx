import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage'

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoinfo, setPhotoInfo] = useState('');

  async function fetchImages() {
    storage()
      .ref('images') //pasta do firebase que criamos
      .list()
      .then(result => {
        const files: FileProps[] = [];

        result.items.forEach(file => {
          files.push({
            name: file.name,
            path: file.fullPath
          });
        });
        setPhotos(files);
      });
  }

  useEffect(() => {
    fetchImages();
  }, [])

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage);

    const info = await storage().ref(path).getMetadata();
    setPhotoInfo(`Imagem selecionada ${info.name}`);
  }

  async function handleDeleteImage(path: string) {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert('Imagem excluida com sucesso!')
        fetchImages();
      })
      .catch(error => console.log(error));
  }


  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        {photoinfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
