import { getRepository } from 'typeorm';
import { User } from './user.entity';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../common/enums';
import { IGetUserGeneralDataResponse } from '../common/interfaces';

class UserService {
  private userRepository = getRepository(User);

  public async getGeneralData(userId: string): Promise<IGetUserGeneralDataResponse> {
    const data: IGetUserGeneralDataResponse[] = await this.userRepository.query(
      'SELECT \n' +
        '    "user"."fullName",\n' +
        '    "user"."avatar",\n' +
        '    "user"."createdAt" as "joinedTime",\n' +
        '    COUNT("take"."quizId") as "quizzesPassed",\n' +
        '    (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "quizzesCreated"\n' +
        '        FROM "quiz" \n' +
        '        WHERE "quiz"."userId" = "user"."id"\n' +
        '    ),\n' +
        '    (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "quizzesPublished"\n' +
        '        FROM quiz \n' +
        '        WHERE "quiz"."userId" = "user"."id" \n' +
        '            AND "quiz"."published" = \'true\'\n' +
        '    ),\n' +
        '    (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "correctNumber"\n' +
        '        FROM "take"\n' +
        '        INNER JOIN "take_question" \n' +
        '        ON "take_question"."takeId" = take."id"\n' +
        '        WHERE "take"."userId" = "user"."id"\n' +
        '            AND "take_question"."correctlyAnswered" = \'true\' \n' +
        '            AND "take_question"."answered" = \'true\'\n' +
        '    ),\n' +
        '        (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "incorrectNumber"\n' +
        '        FROM "take"\n' +
        '        INNER JOIN "take_question" \n' +
        '        ON "take_question"."takeId" = take."id"\n' +
        '        WHERE "take"."userId" = "user"."id"\n' +
        '            AND "take_question"."correctlyAnswered" = \'false\' \n' +
        '            AND "take_question"."answered" = \'true\'\n' +
        '    ),\n' +
        '    (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "notAnswered"\n' +
        '        FROM "take"\n' +
        '        INNER JOIN "take_question" \n' +
        '        ON "take_question"."takeId" = take."id"\n' +
        '        WHERE "take"."userId" = "user"."id"\n' +
        '            AND "take_question"."answered" = \'false\'\n' +
        '    ),\n' +
        '    (\n' +
        '        SELECT \n' +
        '        COUNT(*) as "totalAnswers"\n' +
        '        FROM "take"\n' +
        '        INNER JOIN "take_question" \n' +
        '        ON "take_question"."takeId" = take."id"\n' +
        '        WHERE "take"."userId" = "user"."id"\n' +
        '    )\n' +
        'FROM "user"\n' +
        'LEFT JOIN "take" \n' +
        'ON "user"."id" = take."userId"\n' +
        'WHERE "user"."id" = $1\n' +
        'GROUP BY "user"."id"',
      [userId],
    );

    const convertedCountValuesToNumbers = {
      ...data[0],
      correctNumber: Number(data[0].correctNumber),
      incorrectNumber: Number(data[0].incorrectNumber),
      notAnswered: Number(data[0].notAnswered),
      quizzesCreated: Number(data[0].quizzesCreated),
      quizzesPassed: Number(data[0].quizzesPassed),
      quizzesPublished: Number(data[0].quizzesPublished),
      totalAnswers: Number(data[0].totalAnswers),
    };

    return convertedCountValuesToNumbers;
  }
}

export default UserService;
