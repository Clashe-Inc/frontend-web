import SummonerLoginService from '@/services/SummonerLoginService';
import HttpClient from '@/plugins/HttpClient';

jest.mock('@/plugins/HttpClient');

const httpClientMock = jest.mocked(HttpClient);

describe('SummonerLoginService', () => {
  it('the summoner should be authenticated', async () => {
    const postMock = jest.fn().mockResolvedValueOnce({
      data: {
        access_token: 'abc123',
        token_type: 'bearer',
      },
    });
    httpClientMock.post = postMock;
    const data = await SummonerLoginService.authenticate({
      username: 'username@test.com',
      password: 'abc123',
    });
    expect(data.access_token).toBe('abc123');
    expect(data.token_type).toBe('bearer');
    const { calls } = postMock.mock;
    expect(calls[0][0]).toBe('/v1/summoners/login');
    expect(calls[0][1].get('username')).toBe('username@test.com');
    expect(calls[0][1].get('password')).toBe('abc123');
  });
});
