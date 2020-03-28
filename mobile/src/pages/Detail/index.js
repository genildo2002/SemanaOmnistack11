import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { Feather } from "@expo/vector-icons";

import * as MailComposer from 'expo-mail-composer';

import { useNavigation, useRoute } from "@react-navigation/native" //UseRoute prarecebe os dados enviados do incidents

import styles from './styles'

import logoImg from '../../assets/logo.png';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident; //Pega o parâmetro enviado de incidents [incident]

    const message = `Olá ${incident.name}.
    Meu contato é para informar que ajudarei no caso "${ incident.title}", com o valor de ${Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(incident.value)} !`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso - ${incident.title}`,
            recipients: [incident.email],
            body: message

        })
    }

    function sendWhatsApp(){
        //alert('whats');
        Linking.openURL(`whatsapp://send?phone=${incident.whatsup}&text=${message}`);
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-left"size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{ marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{ incident.name } de { incident.city} - { incident.uf } </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{ incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        {style: 'currency',currency: 'BRL'})
                        .format(incident.value)}
                    </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso!</Text>
                <Text style={styles.heroDescription}>Enter em contato</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
