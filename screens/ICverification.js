import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    TextInput,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import { globalStyles } from "../styles";
import { RadioButton } from "react-native-paper";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Camera from "../services/Camera";
import Api from "../services/Api";

export default function ICVerification({ navigation }) {
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [IC_no, setICNo] = useState(null);
    const [image, setImage] = useState(null);
    const [imageBack, setImageBack] = useState(null);
    const [gender, setGender] = useState("Male");
    const [homeAddress, setHomeAddress] = useState(null);
    const [error, setError] = useState({});

    useEffect(() => {
        Camera.cameraPermission();
    }, []);

    const storeCredential = () => {
        let data = {
            first_name: first_name,
            last_name: last_name,
            telephone: telephone,
            IC_no: IC_no,
            IC_image: image,
            IC_image_back: imageBack,
            gender: gender,
            homeAddress: homeAddress,
        };
        Api.request("storeVerificationCredential", "POST", data).then(
            (response) => {
                if (response.success) {
                    navigation.navigate("Selfie");
                } else {
                    setError(response.message);
                }
            }
        );
    };

    const takePhoto = () => Camera.pickImage().then((image) => setImage(image));
    const takePhotoBack = () => Camera.pickImage().then((image) => setImageBack(image));

    return (
        <ScrollView style={globalStyles.container_2}>
            <Text>
                Please insert your personal information and verified yourself
                with your IC.
            </Text>
            <Text style={{ marginTop: 20 }}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={(first_name) => setFirstName(first_name)}
                placeholder={"ex. John"}
            />
            {error.first_name && <ErrorMessage message={error.first_name} />}
            <Text>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={(last_name) => setLastName(last_name)}
                placeholder={"ex. Joseph"}
            />
            {error.last_name && <ErrorMessage message={error.last_name} />}
            <Text>Telephone No</Text>
            <TextInput
                keyboardType="numeric"
                style={globalStyles.input}
                onChangeText={(telephone) => setTelephone(telephone)}
                placeholder={"ex. 01245637282"}
            />
            {error.telephone && <ErrorMessage message={error.telephone} />}
            <Text>IC Number</Text>
            <TextInput
                keyboardType="numeric"
                style={globalStyles.input}
                placeholder={"ex. 010111010111"}
                onChangeText={(IC_no) => setICNo(IC_no)}
            />
            {error.IC_no && <ErrorMessage message={error.IC_no} />}

            <Text>Home Address</Text>
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                onChangeText={(text) => setHomeAddress(text)}
            />
            {error.homeAddress && <ErrorMessage message={error.homeAddress} />}

            <Text>Gender</Text>
            <View style={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ marginRight: 45 }}>Male</Text>
                    <RadioButton
                        color="#2196F3"
                        value="Male"
                        status={gender === "Male" ? "checked" : "unchecked"}
                        onPress={() => setGender("Male")}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ marginRight: 30 }}>Female</Text>
                    <RadioButton
                        color="#2196F3"
                        value="Female"
                        status={gender === "Female" ? "checked" : "unchecked"}
                        onPress={() => setGender("Female")}
                    />
                </View>
            </View>
            <Text>IC Photo</Text>
            {image ? (
                <Image
                    source={{ uri: "data:image/jpeg;base64," + image }}
                    style={globalStyles.image}
                />
            ) : (
                <View
                    style={[
                        globalStyles.image,
                        {
                            justifyContent: "center",
                            backgroundColor: "#CCD1D1",
                        },
                    ]}
                >
                    <Text style={{ textAlign: "center" }}>
                        No photo is taken yet
                    </Text>
                </View>
            )}
            {error.IC_image && <ErrorMessage message={error.IC_image} />}

            <SecondaryButton
                title={image ? "RETAKE IC PHOTO" : "TAKE IC PHOTO (FRONT)"}
                action={takePhoto}
            />
            {imageBack ? (
                <Image
                    source={{ uri: "data:image/jpeg;base64," + imageBack }}
                    style={globalStyles.image}
                />
            ) : (
                <View
                    style={[
                        globalStyles.image,
                        {
                            justifyContent: "center",
                            backgroundColor: "#CCD1D1",
                        },
                    ]}
                >
                    <Text style={{ textAlign: "center" }}>
                        No photo is taken yet
                    </Text>
                </View>
            )}
            {error.IC_image_back && <ErrorMessage message={error.IC_image_back} />}

            <SecondaryButton
                title={imageBack ? "RETAKE IC PHOTO" : "TAKE IC PHOTO (BACK)"}
                action={takePhotoBack}
            />
            <View style={{ marginBottom: 20 }}>
                <PrimaryButton title="NEXT" action={storeCredential} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        textAlignVertical: "top",
        padding: 10,
    },
});
