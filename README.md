# 김家네 Project
### ショッピングモール購入顧客リワードシステム

# プロジェクト紹介
### ユーザーは認証を行い、出席、リワード確認、受領サービスを利用可能で、
### 管理者は在庫不足の通知を受信し、在庫調整や現状確認ができる出席リワードシステムです。

- ユーザー情報を認証した後、1日1回の出席チェックが可能
- 一定の出席回数を達成すると、該当する商品を受領
> 5日出席 -> 現金ポイント5000ウォン | 15日出席 -> AirPods
- イベント管理者が出席およびリワードの状況を確認可能

# 開発期間
2023年3月7日 ～ 2023年3月23日

# メンバー構成
- キム・サンユン（リーダー）：ユーザー出席、リワード管理ECSサーバー構築、ECS CI/CD進行、サーバーのIaC化
- キム・ジフン：リワード管理者ドメイン実装
- キム・ゴン：リワード管理者ドメイン実装
### - キム・テファン(本人) : ユーザー認証システムCognito実装, リワード管理者システム顧客出席状況確認リソース実装、IaC(Terraform)及びCI/CDテスト

# アーキテクチャ図

![image](https://user-images.githubusercontent.com/60168922/227113224-7c897ac1-d738-4d4c-8a5b-2924cb9d400c.png)


# 主な機能

### データベースおよびERDダイアグラム

![image](https://user-images.githubusercontent.com/60168922/227113444-466c8c6a-ea9f-421a-9bb0-32397cde176b.png)


### ユーザー情報認証

![image](https://user-images.githubusercontent.com/60168922/227114056-e74a3df8-b4fa-4b03-8d11-b1c00c757c4a.png)
- 既にユーザーがショッピングモールに登録されていると仮定し、Cognitoからトークンを取得して使用
- イベントシステムのルートパスにアクセスした際に、トークンをCognitoに送り認証を実施
- その後、ユーザー認証の状態をbooleanで保存し、出席やリワード機能を実行する際に認証状態を確認

### ユーザー出席、リワードドメイン

![image](https://user-images.githubusercontent.com/60168922/227114966-fed76633-486f-47c3-9a0b-578e390da95d.png)
- 出席管理、受け取れるリワード確認、リワード受領機能を提供
- VPC外部にあるDynamoDBと連携するため、DynamoDB用VPCエンドポイントを使用
- 可用性を確保するために、Application Load BalancerおよびAuto Scaling Groupを活用
- サーバーレスアーキテクチャを実現するためにFargateを使用

### イベント管理者、通知ドメイン

![image](https://user-images.githubusercontent.com/60168922/227115098-8a9b47ae-807f-4324-b907-96dc47ae2451.png)
#### 管理者ドメイン
- 商品の在庫管理、リワード出席状況管理機能を提供
- サーバーレスアーキテクチャを実現するためにLambdaを使用
在庫確認通知ドメイン
#### 在庫確認通知ドメイン
- EventBridgeのcron機能を利用して、毎日定期的に在庫を確認
- AWS SESサービスを使用して、管理者に通知メールを送信
- さらに、ユーザーAPIで商品を受領後、在庫が不足した際に通知メールを生成

### CI/CD (github actions, CodeBuild ..) & IaC (Terraform)

![image](https://user-images.githubusercontent.com/60168922/227115335-eecf1e75-6fac-40eb-9af8-41ce5c1552f1.png)

