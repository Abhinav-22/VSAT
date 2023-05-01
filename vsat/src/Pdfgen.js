import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "black",
  },
  heading: {
    textAlign: "center",
    marginTop: 30,
    
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

function Pdfgen() {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <Text>VSAT</Text>
          </View>

          <View style={styles.section}>
            <Text>Domain Status :</Text>
          </View>
          <View style={styles.section}>
            <Text>SSL : </Text>
          </View>
          <View style={styles.section}>
            <Text>Phishtank Status :</Text>
          </View>
          <View style={styles.section}>
            <Text>HSTS Status: </Text>
          </View>
          <View style={styles.section}>
            <Text>Data Breach Status :</Text>
          </View>
          <View style={styles.section}>
            <Text>Ports open : </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default Pdfgen;
