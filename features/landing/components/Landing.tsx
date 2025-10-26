import Content from './Content'
import HeroImage from './HeroImage'

const Landing = () => {
  return (
    <div>
      <HeroImage />
      <Content
        paragraphs={[
          'Codebusters pozwoli Ci poznawać i w praktyce ćwiczyć technologie Front-end, takie jak HTML5, CSS oraz JavaScript!',
          'Możesz rozwiązywać zadania, piąć się w rankingu, zdobywać osiągnięcia i poziomy znajomości różnych technologii, a nawet wyeksportować swoje wyniki i pochwalić się nimi!',
        ]}
        videoId='NKsma2XgjL4'
      />
    </div>
  )
}

export default Landing
