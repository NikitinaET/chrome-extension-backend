import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review, ReviewDocument } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}
  async getReview(location: string) {
    return this.reviewModel.find({ location });
  }
  async createReview(createReviewDto: CreateReviewInput) {
    const find = await this.reviewModel.find({
      username: createReviewDto.username,
      location: createReviewDto.location,
      isLiked: createReviewDto.isLiked,
    });
    // if (find.length > 0)
    //   throw new ConflictException(
    //     'The user has already made a review for that site!',
    //   );

    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }
}
