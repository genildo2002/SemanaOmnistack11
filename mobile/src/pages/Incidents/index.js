import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons";

import logoImg from '../../assets/logo.png';

import styles from './styles'

import api from '../../services/api';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal]= useState(0);
    const [page, setPage] = useState(1);
    const [ loading, setLoading]  = useState(false);


    function navigateToDetail(incident){    //recebe o parâmetro
        navigation.navigate('Detail',{ incident});  // envia o parâmetro para o detail
    }

    async function loadIncidents (){
        if (loading) { //Evitar que enquanto outra requisição seja feita que mis uma venha acontecer. ex.: Usuario forçando várias vezes
            return;
        }
        if (total>0 && Incidents.length ===total) {
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);   //anexa ao resultado anterior os novos
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!!!</Text>
            <Text style={styles.description}>Escolha um dos casos e salva o dia!!!</Text>
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached = {loadIncidents}  //carreganovos incidentes ao alcançar o final da lista
                onEndReachedTreshold={0.2}  //quando tiver 20% do final dalista reccarega novos ítens
                renderItem={({ item: incident })=>(
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        {style: 'currency',currency: 'BRL'})
                        .format(incident.value)}
                    </Text>

                    <TouchableOpacity style={styles.detailsButton}
                    onPress={()=>navigateToDetail(incident)}
                    >
                    <Text style={styles.detailButtonText}>Ver Detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>

                )}
            />
            <View>
            </View>
        </View>
    )
}
