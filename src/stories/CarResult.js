import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default class CarResult extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }


  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.photoGalery.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.photoGalery.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  featuredOrSold() {
    if (this.props.featured) {
      return (<p style={{
        fontSize: '12px',
        position: 'absolute',
        top: '10px',
        left: '23px',
        background: 'white', /* fallback color */
        borderRadius: '3px',
        border: '1px solid lightgray',
        }}
      >Destacado
      </p>);
    }
    if (this.props.sold) {
      return (
        <p style={{
          fontSize: '12px',
          position: 'absolute',
          top: '10px',
          left: '23px',
          background: 'white', /* fallback color */
          borderRadius: '3px',
          border: '1px solid lightgray',
          color: 'green',
          }}
        >Vendido
        </p>
      );
    }
    return true;
  }

  render() {
    console.log(this.props.data);
    const { activeIndex } = this.state;
    const slides = this.props.photoGalery.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img style={{ position: 'relative', width: '100%', height: '250px' }} src={item.src} alt={item.altText} />
      </CarouselItem>
    ));
    return (
      <div>
        <div className="car-container">
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={this.props.photoGalery} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}

            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
          {this.featuredOrSold()}

          <p>{this.props.data.group}</p>
          <p>{this.props.data.modelName}</p>
          <p>{this.props.data.kms}</p>
          <p>{this.props.data.price}</p>
          <p>{this.props.data.year}</p>
        </div>
        <style jsx>{
        `
        .car-container{
          border: 1px solid lightgray;
          border-radius:3px;
          padding:0;
        }
        `
      }
        </style>
      </div>

    );
  }
}
