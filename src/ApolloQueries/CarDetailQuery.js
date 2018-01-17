import gql from 'graphql-tag';

const CarDetailQuery = gql`
query Publication($id: Int!) {
  Publication(id: $id) {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
        image4
        image5
        image6
        image7
        image8
      }
      brand
      observation
      group
      modelName
      price
      fuel
      year
      carState
      codia
      kms
      User{
        id
        email
        name
        address
        phone
        agencyName
        agencyAdress
        agencyEmail
        agencyPhone
        profileImage
        bannerImage
      }
    }
  }
    `;
const CarSpecs = gql`query Specifications($id: Int!) {
  Publication(id: $id) {
    Specifications {
      Alimentacion
    Motor
    Puertas
    Clasificacion
    Cabina
    Carga
    PesoTotal
    VelocidadMax
    Potencia
    Largo
    Ancho
    Alto

    Direccion
    Traccion
    Importado
    Caja
    FrenosAbs
    Airbag
    Climatizador
    FarosAntiniebla
    TechoCorredizo
    SensorEstacionamiento
    AirbagLateral
    AirbagCabezaConductor
    AirbagCortina
    AirbagRodilla

    FijacionISOFIX
    ControlDeTraccion
    ControlDeEstabilidad
    ControlDeDescenso
    SistemaArranqueEnPendiente
    ControlDinamicoConduccion
    BloqueoDiferencial
    RepartidorElectronicoDeFrenado
    AsistenteDeFrenadoEmergencia
    ReguladorParFrenado
    
    TapizadoCuero
    AireAcondicionado    
    AsientosElectronicos
    ComputadoraABordo
    FarosDeXenon
    LLantasDeAleacion
    TechoPanoramico
    SensorDeLluvia
    SensorCrepuscular
    IndicadorPresionNeumaticos
    VolanteConLevas
    Bluetooth
    AsientosTermicos
    RunFlat
    }
  }
}
`;
const CommentThreadQuery = gql`
query CommentThread($publication_id: Int, $user_id: Int, $chatToken: String) {
  CommentThread(publication_id: $publication_id, user_id: $user_id, chatToken: $chatToken) {
    id
    chatToken
    messages {
      id
      content
      from_id
      User {
        name
      }
    }
  }
}
`;

export { CarDetailQuery, CarSpecs, CommentThreadQuery };
