import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';



const Pokemons = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(response => response.json())
            .then(data => setPokemonData(data.pokemon))
            .catch(error => console.log(error));
    }, []);

    const groupPokemonsByType = () => {
        const groupedPokemons = {};

        pokemonData.forEach(pokemon => {
            pokemon.type.forEach(type => {
                if (groupedPokemons[type]) {
                    groupedPokemons[type].push(pokemon);
                } else {
                    groupedPokemons[type] = [pokemon];
                }
            });
        });
        

        return groupedPokemons;
    };

    const renderPokemonCard = ({ item }) => (
        <TouchableOpacity style={styles.Container} onPress={() => setSelectedPokemon(item)}>
            <Image source={{ uri: item.img }} style={styles.Image} />
            <Text style={styles.Name}>{item.name} </Text>
        </TouchableOpacity>
    );

    const renderPokemonDetails = () => (
        <Modal visible={selectedPokemon !== null} animationType='slide'>
            <View style={styles.Ccontainer}>
                <Image source={{ uri: selectedPokemon?.img }} style={styles.dImage} />
                <Text style={styles.dName}>{selectedPokemon?.name}</Text>
                <Text style={styles.detailsInfo}>Type: {selectedPokemon?.type.join(', ')}</Text>
                <Text style={styles.dInf}>Height: {selectedPokemon?.height}</Text>
                <Text style={styles.dInf}>Weight: {selectedPokemon?.weight}</Text>
                <TouchableOpacity style={styles.cButton} onPress={() => setSelectedPokemon(null)}>
                    <Text style={styles.cButtonT}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    const groupedPokemons = groupPokemonsByType();

    return (
        <ScrollView>
            <Text style={{ fontWeight: 'bold', fontSize: 40, fontStyle: 'sherif', color: '#1900FF' ,marginBottom:20 , marginTop:20,marginLeft:110}}>My List</Text>
            {Object.entries(groupedPokemons).map(([type, pokemons]) => (
                <View key={type}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, fontStyle: 'italic', color: '#F10000' ,marginBottom:50 , marginTop:50 }}>{type}:</Text>
                    <FlatList style={styles.flatList}
                        data={pokemons}
                        keyExtractor={pokemon => pokemon.id.toString()}
                        numColumns={2}
                        renderItem={renderPokemonCard}
                    />
                </View>
            ))}
            {renderPokemonDetails()}
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 20,
        color: 'white'


    },
    Container: {
        backgroundColor: '#0122DF',
        borderRadius: 100,
        marginBottom: 25,
        width: Dimensions.get('window').width / 2 - 30,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        shadowColor: '#000',
       
        shadowOpacity: 1,
        shadowRadius: 19,
        elevation: 12,
    },
    Image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
        height: 70,
        borderRadius: 35
    },
    Name: {
        
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        color:'light-grey'
    },
    Ccontainer: {
        flex: 1,
        alignItems: 'center',

        justifyContent: 'center',
        backgroundColor: '#B9D325',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        borderRadius: 80,
        shadowColor: '#000',
        shadowOpacity: 100,
        shadowRadius: 50,
        elevation: 100,
         marginTop: 20,
         border:'black',
         borderweight:50,
         marginLeft: 10,
         marginRight: 10,
         marginBottom: 20,
         fontstyle:'sherif',
         fontweight:'50'
        
    },
    dImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20
    },
    dName: {
        fontWeight: 'max',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
        color: 'black',
        fontSize: 40,
        fontstyle:'sherif',
        fontWeight: '70',
        marginBottom: 10
    },
    dInf: {
        fontSize: 180,
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
        color: 'black',
        fontSize: 18,
        fontstyle:'sherif',
    },
    cButton: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20

    },
    cButtonT: {
        fontSize: 18,
        buttonwidth:60,
        borderradius:5,
        fontWeight: '700',
        textAlign: 'center'
    },
    
});

export default Pokemons;

